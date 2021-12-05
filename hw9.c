#include <stdio.h>

 struct city
{
	char name[20];
	char country[30];
	int pop;
};

int main(void)
{
	struct city arr[3] = { 0 };
	int i = 0;
	printf("Input three cities:\n");
	for (i = 0; i < 3; i++)
	{
		printf("Name >");
		scanf_s("%s", arr[i].name, 20);
		printf("Country >");
		scanf_s("%s", arr[i].country, 30);
		printf("Population >");
		scanf_s("%d", &(arr[i].pop));

	}
	printf("Printing the three cities:\n");
	
	printf("1. %s in %s with a population of %d people\n",arr[0].name, arr[0].country, arr[0].pop);
	printf("2. %s in %s with a population of %d people\n",arr[1].name, arr[1].country, arr[1].pop);
	printf("3. %s in %s with a population of %d people\n",arr[2].name, arr[2].country, arr[2].pop);
	
	
	return 0;
}
