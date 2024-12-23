#include <stdio.h>

void rotateLeft(int *arr, int size, int positions) {
       positions = positions % size;
    
    int temp[size];
    
    for (int i = 0; i < size; i++) {
        temp[i] = arr[(i + positions) % size];

    for (int i = 0; i < size; i++) {
        arr[i] = temp[i];
    }
}

int main() {
    int size, positions;


    printf("Enter the size of the array: ");
    scanf("%d", &size);
    
    int arr[size];

   
    printf("Enter the elements of the array: ");
    for (int i = 0; i < size; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Enter the number of positions to rotate left: ");
    scanf("%d", &positions);
    
  
    printf("Before rotation: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

 
    rotateLeft(arr, size, positions);

    printf("After rotation:  ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}