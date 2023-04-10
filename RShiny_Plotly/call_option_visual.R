# Import the create_option_price_visual function
# source("modules/create_option_price_visual.R")
library(shiny)
library(plotly)

source("create_option_price_visual.R")
option_type_call <- "Call"
option_price_api_host_address <- "127.0.0.1"
option_price_api_host_port <- 8080
shiny_app_launch_address = 7319

# Call the function with the Call parameters
create_option_price_visual(option_type_call, option_price_api_host_address, option_price_api_host_port, shiny_app_launch_address)



