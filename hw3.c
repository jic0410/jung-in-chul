#include <stdio.h>

int main(void)
{
	int i, num, result = 0;
	printf("Please enter a number:");
	scanf_s("%d", &num);

	for (i = 2; i <= num; i++)
	{
		if (num % i == 0)
			result++;
	}
	if (result == 1)
		printf("It is a prime number.");
	else
	    printf("It isn't a prime number.");

	return 0;
}
