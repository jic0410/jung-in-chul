#include <stdio.h>
#include <math.h>

void showdata(double* param)
{
	printf("Standard Deviation = %.3f", * param);
}


int main(void)
{
	double arr[5];
	int i;

	printf("Enter 5 real numbers:");

	for (i = 0; i < 5; i++)
	
		scanf_s("%lf", &arr[i]);

	double sum = 0, aver, k = 0, m;
	for (i = 0; i < 5; i++)
	{
		sum += arr[i];
	}
	aver = sum / 5;
	for (i = 0; i < 5; i++)
	{
		k += pow(arr[i] - aver, 2);

	}
	m = sqrt(k / 5);
	double* param = &m;
	showdata(param);
	return 0;

	

	


	
	

}
