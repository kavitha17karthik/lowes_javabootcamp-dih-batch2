public class numberprint {
    public static void main(String[] args) {
        int number=1;
       /* while(number<=5){
            System.out.println("number is "+number);
            number++;
        }*/
       /* do {
            System.out.println("number is"+number);
            ++number;
        }while(number<=5);*/
        for(int i=0;i<=10;i++){
            if(i==4){
                System.out.println("breaking..");
                //break;
                continue;
            }
            System.out.printf("i value is"+i);
        }
    }
}
