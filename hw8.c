#include <stdio.h>

int main(void)
{
	char input[100] ;
	int i = 0 ;

	printf("Input>");
	gets(input);

	while (input[i])
	{
		if (input[i] >= 65 && input[i] <= 90)
			input[i] += 32;
		else if (input[i] >= 97 && input[i] <= 122)
			input[i] -= 32;

		i++;
	}
	
	printf("Output>");
	puts(input);
	return 0;
}


