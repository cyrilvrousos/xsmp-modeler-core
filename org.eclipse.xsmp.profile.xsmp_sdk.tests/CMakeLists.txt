cmake_minimum_required(VERSION 3.14)

# Set the project name and version
project(TestProject VERSION 1.0.0 LANGUAGES CXX)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Fetch xsmp-sdk content
include(FetchContent)
FetchContent_Declare(
  xsmp-sdk
  GIT_REPOSITORY https://github.com/ydaveluy/xsmp-sdk.git
  GIT_TAG        main
  SOURCE_DIR     ${PROJECT_SOURCE_DIR}/../xsmp-sdk
)

# Make xsmp-sdk content available
FetchContent_MakeAvailable(xsmp-sdk)

# Recursively fetch .cpp files in src and src-gen directories
file(GLOB_RECURSE SRC CONFIGURE_DEPENDS src/*.cpp src-gen/*.cpp)

# Add shared library and its properties
add_library(TestProject SHARED ${SRC})
target_include_directories(TestProject PUBLIC include include-gen PRIVATE src src-gen)
target_compile_options(TestProject PRIVATE -Wno-error=unused-parameter) # should be done in xsmp-sdk
target_link_libraries(TestProject xsmp-client)

# Include CTest for current project
if(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
    include(CTest)
endif()

# Include tests directory if BUILD_TESTING is enabled
if(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME AND BUILD_TESTING)
    add_subdirectory(tests)
endif()
