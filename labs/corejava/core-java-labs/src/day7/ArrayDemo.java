package day7;

public class ArrayDemo {
    static void minNum(int array[]){
        int min=array[0];
        for(int i=1;i<array.length;i++)
        {
            if(array[i]<min)
                min=array[i];
        }
        System.out.println("min value is " + min);

    }
    public static void main(String[] args) {
        int a[]={8,3,-1,5,87,2};
        minNum(a);

    }
}
