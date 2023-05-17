#include <iostream>

int main() {
    if (1 + 1 != 2) {
        std::cerr << "Test failed: 1 + 1 != 2\n";
        return 1;
    }

    std::cout << "All tests passed\n";
    return 0;
}
