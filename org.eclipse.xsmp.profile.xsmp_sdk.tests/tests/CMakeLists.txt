cmake_minimum_required(VERSION 3.14)

# Google Test installation
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/CMakeLists.txt.in 
               ${CMAKE_CURRENT_BINARY_DIR}/googletest-download/CMakeLists.txt)

execute_process(COMMAND ${CMAKE_COMMAND} -G "${CMAKE_GENERATOR}" .
                RESULT_VARIABLE result
                WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/googletest-download )

if(result)
  message(FATAL_ERROR "CMake step for googletest failed: ${result}")
endif()

execute_process(COMMAND ${CMAKE_COMMAND} --build .
                RESULT_VARIABLE result
                WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/googletest-download )

if(result)
  message(FATAL_ERROR "Build step for googletest failed: ${result}")
endif()

# Forcing shared CRT for Google Test
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

# Including Google Test directories
add_subdirectory(${CMAKE_CURRENT_BINARY_DIR}/googletest-src
                 ${CMAKE_CURRENT_BINARY_DIR}/googletest-build
                 EXCLUDE_FROM_ALL)

# Finding all .cpp test files in the tests directory
file(GLOB_RECURSE TestSources CONFIGURE_DEPENDS *.cpp)

# Creating tests for each .cpp file found
foreach(TestSource ${TestSources})
    get_filename_component(TestName ${TestSource} NAME_WE)
    add_executable(${TestName} ${TestSource})
    target_link_libraries(${TestName} gtest gtest_main TestProject)
    add_test(NAME ${TestName} COMMAND ${TestName})
endforeach()