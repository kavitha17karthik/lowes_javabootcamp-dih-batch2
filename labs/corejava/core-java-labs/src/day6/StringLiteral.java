package day6;

import javax.print.DocFlavor;
import java.io.PrintStream;

public class StringLiteral {
    public static void main(String[] args) {

     /*   System.out.println("string literal demo...");
        String str="hello world";
        str.concat("world");
        if(str.equals("hello world"))
            System.out.println("string matches");
        else System.out.println("string does not match");
        String str1="hello";
        str1=str1.concat("world");
        System.out.println(str1);
*/
/*      String str1="hello";
        String str2="hello";
        String str3=new String("hello");
        System.out.println(str1==str2);//true. this == compares reference not value as both str1 and str2 are literal strings both will
                                       //point to the same memory location.
        System.out.println(str1==str3);//false. str1 is literal and str3 is object .
*/
        /*StringBuffer str = new StringBuffer("hello");
       // str.append("world");
       // System.out.println(str);

        // insert
        str.insert(5, "World");
        System.out.println(str);

        // replace
        str.replace(0, 3, "World");
        System.out.println(str);

        // delete
        str.delete(1,3);
        System.out.println(str);

        str.reverse();
        System.out.println(str);
        */

       /*//stringbuffer capacity is always 16
       StringBuffer strBuff = new StringBuffer();
        System.out.println(strBuff.capacity());
        strBuff.append("hello");
        System.out.println(strBuff.capacity());
        */

        String str1="Kavitha";
        String str2="Hello";
        String str3="kavitha";
        System.out.println(str1.compareTo(str1));//0
        System.out.println(str1.compareTo(str2));//+3
        System.out.println(str1.compareTo(str3));
        System.out.println(str2.compareTo(str3));
        System.out.println(str3.compareTo(str1));

        }
}
