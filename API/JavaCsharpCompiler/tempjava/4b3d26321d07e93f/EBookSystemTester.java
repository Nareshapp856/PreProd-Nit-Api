
class Book
{
	String name;
	public Book(String name,String author)
	{
		this.name=name;
        this.author=author;
	}
	public void getDetails()
	{
		System.out.println("name of the Book"+name);
        System.out.println("author of the Book"+author);
	}
}
class Ebook extends Book
{
	String Ebook;
	public Book(String name,String Ebook)
	{
		super(name);
		this.Ebook=Ebook;
	}
	public void getDetails()
	{
		System.out.println("Ebook"+Ebook);
	}
}
class AudioBook extends Ebook
{
	String fileFormat;
	public AudioBook(String name,String Ebook,String fileFormat)
	{
		super(name,AudioBook);
		this.fileFormat=fileFormat;
	}
	public void displayAudioBookInfo()
	{
		System.out.println("fileFormat"+fileFormat);
	}
}
public class EBookSystemTester
{
	public static void main(String[] args)
	{
		Ebook e=new Ebook("Java Programming","John Doe","PDF");
		e.displayBookInfo();
		e.displayEbookInfo();
		e.displayAudioBookInfo();
	}
}