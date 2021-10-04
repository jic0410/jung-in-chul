#include <stdio.h>

int main(void)
{
	double km;
	double mile;
	printf("Please enter kilometers:");
	scanf_s("%lf", &km);
	
	mile = km * 0.62137;
	printf("%.1f km is equal to %.1f miles.\n", km, mile);
	return 0;
}
