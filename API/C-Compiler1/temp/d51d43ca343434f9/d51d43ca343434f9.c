#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX 100

// Stack structure to hold parentheses
struct Stack {
    int top;
    char items[MAX];
};

// Function to initialize the stack
void initStack(struct Stack* s) {
    s->top = -1;
}

// Function to check if stack is empty
bool isEmpty(struct Stack* s) {
    return s->top == -1;
}

// Function to push an item into the stack
void push(struct Stack* s, char ch) {
    if (s->top < MAX - 1) {
        s->items[++(s->top)] = ch;
    }
}

// Function to pop an item from the stack
char pop(struct Stack* s) {
    if (!isEmpty(s)) {
        return s->items[(s->top)--];
    }
    return '\0'; // return null character if stack is empty
}

// Function to check if the pair of parentheses is matching
bool isMatchingPair(char left, char right) {
    return
