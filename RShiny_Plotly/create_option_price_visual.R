library(shiny)
library(plotly)

# create_option_price_visual.R
create_option_price_visual <- function(option_type, host_address, port_address, shiny_app_launch_address) {
  library(shiny)
  library(plotly)

  # Define UI
  ui <- fluidPage(
    titlePanel(
      tags$span(textOutput("dynamicTitle"), style = "color: green; font-family: Verdana;"),
      tags$head(tags$meta(name = "viewport", content = "width=device-width, initial-scale=1"))
      ),
    plotlyOutput("optionPricesLinePlot")
  )

  server <- function(input, output, session) {
    # Create dynamic title based on option_type
    output$dynamicTitle <- renderText({
      paste(option_type, "Option Price Graph")
    })
    
    output$optionPricesLinePlot <- renderPlotly({
      query <- parseQueryString(session$clientData$url_search)
      dateToFetch = query[['dateToFetch']]

      if (!is.null(dateToFetch)) {
        url <- paste0("http://", host_address, ":", port_address, "/calculateoptionprices/", dateToFetch, "/")
        response <- tryCatch({
          httr::GET(url)
        }, error = function(e) {
          return(NULL)
        })
        if (is.null(response)) {
          return("Error fetching data.")
        }
        data <- httr::content(response, as = "text")

        # Extract "success" value and convert to table
        success <- jsonlite::fromJSON(data)$success
        success <- gsub("\\\\", "", success)  # remove escape characters
        success <- gsub('"\\[', '[', success)  # remove quotes around "[" at beginning
        success <- gsub('\\]"', ']', success)  # remove quotes around "]" at end
        tableData <- jsonlite::fromJSON(success)

        # Filter data for OptionType = option_type
        tableData <- subset(tableData, OptionType == option_type)

        # Create line plot
        linePlot <- plot_ly(tableData, x = ~StrikePrice, y = ~OptionPrice, type = "scatter", mode = "lines+markers", name = paste(option_type, "Option Prices"))

        currentPrice_val <- min(tableData$CurrentPrice)

        # Add dotted line for Current Price
        if (!is.null(tableData$CurrentPrice)) {
          option_max_val = max(tableData$OptionPrice)
          linePlot <- layout(linePlot,
                             xaxis = list(title = "Strike Price", range = c(min(tableData$StrikePrice), max(tableData$StrikePrice))),
                             yaxis = list(title = paste(option_type, "Option Price"), range = c(0, max(tableData$OptionPrice) + 2)),
                             shapes = list(
                               list(type = "line", x0 = currentPrice_val, y0 = 0, x1 = currentPrice_val, y1 = option_max_val,
                                    line = list(color = "green", dash = "dot", width = 2),
                                    legendgroup = "Current Price")
                             ))
          linePlot <- add_trace(linePlot, type = "scatter", mode = "lines", x = c(currentPrice_val, currentPrice_val),
                                y = c(0, option_max_val), line = list(color = "green", dash = "dot", width = 2),
                                name = "Current Price", legendgroup = "Current Price")

        }

        # Customize plot layout
        linePlot <- layout(linePlot, xaxis = list(title = "Strike Price"), yaxis = list(title = paste(option_type, "Option Price")))

      } else {
        plot.new()
        title("No Input Available")
      }
    })
  }

  # Run the app
  shinyApp(ui, server)
  runApp(list(ui = ui, server = server), port = shiny_app_launch_address)
}
