package day7;
public class ArrayClone {
    public static void main(String[] args) {
        System.out.println("Array cloning");
        char srcArray[]={'k','a','v','i','t','h','a'};

        System.out.println("source array content");
        for(char i:srcArray) {
            System.out.print(i);
        }
        char dstArray[] = srcArray.clone();
        System.out.println("\ndestination array content");
        for(char j:dstArray)
            System.out.print(j);
    }

}
