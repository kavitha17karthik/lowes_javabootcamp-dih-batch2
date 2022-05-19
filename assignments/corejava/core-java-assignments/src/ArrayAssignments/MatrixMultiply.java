package ArrayAssignments;

public class MatrixMultiply {

    public static void main(String[] args) {
        int mat1[][]={{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int mat2[][]={{10, 10, 10}, {10, 10, 10}, {10, 10, 10}};
        int sumMat[][]= new int[3][3];
        int prodMat[][]=new int[3][3];

        System.out.println("First Array Elements");
        for(int i=0;i<3;i++) {
            for(int j=0;j<3;j++){
                System.out.print(mat1[i][j]+" ");
            }
            System.out.println();
        }
        System.out.println("Second Array Elements");
        for(int i=0;i<3;i++) {
            for(int j=0;j<3;j++){
                System.out.print(mat2[i][j]+" ");
            }
            System.out.println();
        }
        System.out.println("Multiplication of matrix1 and Matrix 2 ");
        for(int i=0;i<3;i++) {
            for(int j=0;j<3;j++){
                prodMat[i][j]=0;
                for(int k=0;k<3;k++){
                    prodMat[i][j] += mat1[i][k] * mat2[k][j];
                }
                System.out.print(prodMat[i][j] + " ");
            }
            System.out.println();
        }
    }
}
