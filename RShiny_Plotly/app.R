location_R_Installation <- "C:/Program Files/R/R-4.2.3/bin"
directory_path_option_pricer_files <- "C:/Users/WinVM2_2/Desktop/GitCommit/ShinyAppTest1/src_option_pricer/"

setwd(directory_path_option_pricer_files)

command1 <- paste0('"', normalizePath(file.path(location_R_Installation, "RScript.exe")), '" "', normalizePath(file.path(directory_path_option_pricer_files, "call_option_visual.R")), '"')
system(command1, wait = FALSE)

command2 <- paste0('"', normalizePath(file.path(location_R_Installation, "RScript.exe")), '" "', normalizePath(file.path(directory_path_option_pricer_files, "put_option_visual.R")), '"')
system(command2, wait = FALSE)
