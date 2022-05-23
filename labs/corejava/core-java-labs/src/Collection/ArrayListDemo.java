package Collection;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Iterator;
import java.util.ListIterator;

public class ArrayListDemo {
    public static void main(String[] args) {
        int[] nos=new int[3];
        nos[0]=30;
        nos[1]=10;
        nos[2]=40;
        //add element
        // nos[index]=60;
        //update
        //nos[1]=100;

        for(int i:nos){
            System.out.println(i);
        }
        System.out.println("Arraylist");
        ArrayList arrayList1 = new ArrayList();
        arrayList1.add(1000);
        arrayList1.add("kavitha");
        arrayList1.add(true);
        for(Object index:arrayList1) {
            System.out.println(index);
        }
        System.out.println("Updated Arraylist");
        //update an element
        arrayList1.set(2,3000);
        for(Object index:arrayList1) {
            System.out.println(index);
        }
        //remove an element
        System.out.println("Removal Arraylist");
        arrayList1.remove(0);

        for(Object index:arrayList1) {
            System.out.println(index);
        }
         // List
        System.out.println("Arraylist");
        ArrayList<Integer> arrayList = new ArrayList<>();
        arrayList.add(1000);
        arrayList.add(1001);
        arrayList.add(1002);
        for(Object index:arrayList) {
            System.out.println(index);
        }
        System.out.println("Updated Arraylist");
        //update an element
        arrayList.set(2,3000);
        for(Object index:arrayList) {
            System.out.println(index);
        }
        //remove an element
        System.out.println("Removal Arraylist");
        arrayList.remove(0);

        for(Object index:arrayList) {
            System.out.println(index);
        }

        System.out.println("Iterrator...raw data type");
        Iterator itr = arrayList.iterator();
        while(itr.hasNext())
        {
            System.out.println(itr.next());
        }
        System.out.println("Iterrator...integer data type");
        Iterator itr1 = arrayList.iterator();
        while(itr1.hasNext())
        {
            System.out.println(itr1.next());
        }
        System.out.println("ListIterator..next and previous");
        ListIterator<Integer> listItr = arrayList1.listIterator();
        System.out.println(listItr.next());
        System.out.println(listItr.previous());
    }
}
