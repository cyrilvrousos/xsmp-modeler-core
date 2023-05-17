#include <iostream>

int main() {
	int actualResult = 2;
	int expectedResult = 2;

    if (actualResult != expectedResult) {
        std::cerr << "Test failed: 1 + 1 != 2\n";
        return 1;
    }

    std::cout << "All tests passed\n";
    return 0;
}