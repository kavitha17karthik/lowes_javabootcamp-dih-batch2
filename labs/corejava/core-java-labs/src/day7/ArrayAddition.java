package day7;

public class ArrayAddition {
    public static void main(String[] args) {
        System.out.println("multi dimention array addition");
        int a[][]={{1,2,3},{4,5,6},{7,8,9}};
        int b[][]={{10,20,30},{40,50,60},{70,80,90}};

        int c[][]=new int[3][3];

        //addition
        System.out.println("Addiiton....");
        try {
            for (int i = 0; i <=a.length; i++) {
                for (int j = 0; j < b.length; j++) {
                    c[i][j] = a[i][j] + b[i][j];
                }
            }
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        System.out.println("displaying....");
        for(int i=0;i<a.length;i++)
        {
            for(int j=0;j<b.length;j++)
            {
                System.out.print(c[i][j] + " " );
            }
            System.out.println();
        }

    }
}
