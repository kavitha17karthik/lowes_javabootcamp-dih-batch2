package day7;

import java.lang.*;

public class ArrayCopy {
    public static void main(String[] args) {
        char srcArray[]={'k','a','v','i','t','h','a'};
        char dstArray[]=new char[7];

        System.out.println("source array content");
        System.out.println(String.valueOf(srcArray));

        System.arraycopy(srcArray,0,dstArray,0,7);
        System.out.println("destination array content");
        System.out.println(String.valueOf(dstArray));
    }
}
