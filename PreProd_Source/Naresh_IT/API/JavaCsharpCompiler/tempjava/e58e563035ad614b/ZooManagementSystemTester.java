class Animal{
    private String name;
    private int age;


    Animal(String name,int age){
        this.name=name;
        this.age=age;
    }
    public void getname(){
       return name;

    }
    public int setname(String name){
        this.name=name;
    }
     public void getage(){
        return age;

    }
     public int setage(int age){
        this.age=age;
    }

    public void makeSound(){
System.out.println("The animal makes a generic sound.");                   

    }
    public void displayInfo(){
    System.out.println("animal name is :"+name);
    System.out.println("animal age is :"+age);

    }
}


class lion extends Animal{
    private int meanelegth;


    lion(int meanelegth){
        super(name,age);
        this.meanelegth=meanelegth;
    

    }

public void getermeanelegth(){
   return meanelegth;

}
public int setmeanelegth(int meanelegth){
    this.meanelegth=meanelegth;
}


   public void makeSound(){
    System.out.println("The lion roars loudly.");

   } 

   public void displayManeLength(){
    super.displayInfo();
    System.out.println("meanelegth"+meanelegth);
   }

}

class  Elephant extends Animal{
    private float tuskLength;

   Elephant(float tuskLength){
    super(name,age);
    this.tuskLength=tuskLength;
   }

public void gettuskLength(){
    return tuskLength;
}
public float settuskLength(float tuskLength){
   this.tuskLength=tuskLength;
}

public void makeSound(){
    System.out.println("The elephant trumpets.");

}
public void displayTuskLength(){
    super.displayInfo();
    System.out.println("TuskLength :"+TuskLength);

}


}


public class ZooManagementSystemTester{
    public static void main(String[] arg){
      
    lion l=new lion("simma",4,2);
    l.makeSound();
    l.displayInfo();

Elephant e=new Elephant("dina",17,2.5);
e.displayTuskLength();
e.makeSound();

    }
}