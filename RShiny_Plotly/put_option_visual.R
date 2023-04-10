# Import the create_option_price_visual function
# source("modules/create_option_price_visual.R")
library(shiny)
library(plotly)

source("create_option_price_visual.R")
option_type_put <- "Put"
option_price_api_host_address <- "127.0.0.1"
option_price_api_host_port <- 8080
shiny_app_launch_address = 7320

# Put the function with the Put parameters
create_option_price_visual(option_type_put, option_price_api_host_address, option_price_api_host_port, shiny_app_launch_address)



