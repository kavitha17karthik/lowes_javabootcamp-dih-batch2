package day7;

public class ConvertPrimitivetoWrapper {
    public static void main(String[] args) {
        byte a=10;
        short b=20;
        int c=30;
        long d=40;
        float e=50.5f;
        double f=12.12f;
        char g='g';
        boolean h= false;
        //boxing..convert primitive into wrapper class
        Byte byteObj=a;
        Short shortObj=b;
        //Unboxing ..convert wrapper class to primitive

        byte byteValue = byteObj;
        short shortValue = shortObj;

    }
}
