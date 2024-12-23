interface Consumer {
	void calculateDiscount(double totalBill);
}
class Patient {

	String patientName;
	double consultationFee;
	int numberOfAppointments;
	public Patient(String patientName, double consultationFee, int numberOfAppointments) {
		super();
		this.patientName = patientName;
		this.consultationFee = consultationFee;
		this.numberOfAppointments = numberOfAppointments;
	}
	public double getTotalBill() {
		return consultationFee;
	}
	@Override
	public String toString() {
		return "Patient [patientName=" + patientName + ", consultationFee=" + consultationFee
				+ ", numberOfAppointments=" + numberOfAppointments + "]";
	}
	
}
class HospitalVisit {
	 Patient patient;

	public HospitalVisit(Patient patient) {
		super();
		this.patient = patient;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	@Override
	public String toString() {
		return "HospitalVisit [patient=" + patient + "]";
	} 
	 
}

class BillingSystem implements Consumer{

	@Override
	public void calculateDiscount(double totalBill) {
		if(totalBill>100000) {
			double discount=(totalBill*10)/100;
			totalBill-=discount;
			System.out.println("The total bill of a patient is: "+totalBill);
		}
		else {
		System.out.println("The total bill of the patient is: "+totalBill);	
		}
	}
}
public class MainPatient {
	public static void main(String[] args) {
		Patient p=new Patient("Rohit",500000, 101);
		double bill=p.getTotalBill();
		HospitalVisit h=new HospitalVisit(p);
		BillingSystem b=new BillingSystem();
		System.out.println(p);
		System.out.println(h);
		b.calculateDiscount(bill);
	}

}

