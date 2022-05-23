package Collection;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.ListIterator;

public class LinkedListDemo {
    public static void main(String[] args) {


        System.out.println("LinkedList Demo with Gerenic");
        LinkedList<Integer> linkedList = new LinkedList<Integer>();
        linkedList.add(120);
        linkedList.add(1300);
        linkedList.add(1400);
        linkedList.set(2,3000);
        for(Object index:linkedList) {
            System.out.println(index);
        }
        //remove an element
        System.out.println("Removal Arraylist");
        linkedList.remove(0);

        for(Object index:linkedList) {
            System.out.println(index);
        }

        System.out.println("Iterrator...raw data type");
        Iterator itr = linkedList.iterator();
        while(itr.hasNext())
        {
            System.out.println(itr.next());
        }
        System.out.println("Iterrator...integer data type");
        Iterator itr1 = linkedList.iterator();
        while(itr1.hasNext())
        {
            System.out.println(itr1.next());
        }

        System.out.println("ListIterator..next and previous");
        ListIterator<Integer> listItr = linkedList.listIterator();
        System.out.println(listItr.next());
        System.out.println(listItr.previous());

    }
}
