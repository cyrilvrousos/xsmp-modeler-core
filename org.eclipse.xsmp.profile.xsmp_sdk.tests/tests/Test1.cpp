#include "gtest/gtest.h"
#include "Test/TestModel.h"

class TestModelTest : public ::testing::Test {
protected:
    ::Test::TestModel* testModel;

    void SetUp() override {
        testModel = new ::Test::TestModel("test", "description", nullptr);
    }

    void TearDown() override {
        delete testModel;
    }
};

TEST_F(TestModelTest, TestAddition) {
    EXPECT_EQ(testModel->addition(1, 1), 2);
    EXPECT_EQ(testModel->addition(3, 4), 7);
    EXPECT_EQ(testModel->addition(-1, -1), -2);
}
