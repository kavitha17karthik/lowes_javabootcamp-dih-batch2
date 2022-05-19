package ArrayAssignments;

public class MatrixAdd {
    public static void main(String[] args) {
        int mat1[][]={{11, 22, 33}, {44, 55, 66}, {77, 88, 99}};
        int mat2[][]={{10, 20, 30}, {40, 50, 60}, {70, 80, 90}};
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
        System.out.println("Addition of matrix1 and Matrix 2 ");
        for(int i=0;i<3;i++) {
            for(int j=0;j<3;j++){
                sumMat[i][j] = mat1[i][j]+mat2[i][j];
                System.out.print(sumMat[i][j]+" ");
            }
            System.out.println();
        }
    }
}

