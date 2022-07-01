type Bundle {
	int a = [2];
	@(defaultValue="true")
	boolean bundleName;
	boolean country = (bundleName==true)?false:true;

	port Phones : Phone [2..2] {
	}

	@(domainComputation="true", priceOptions="true")
	port Plans : Plan [1..1] {
	}

	@(domainComputation="true", priceOptions="true")
	port Deliveries : Delivery [1..1] {
	}

}

type Phone {
	string color = ["Black","White","Pink"];
	string ram = ["4 GB","8 GB","12 GB"];
	string screenSize = "6.7";
	string SIM_Count = ["1","2"];
	string comments;
	string country = ["Latvia","Lithuania","Estonia"];
	string bundleName = (country=="Latvia")?"LV":"Other";
	boolean flag24 = country=="Latvia";
	boolean flag12;

	@(domainComputation="true", priceOptions="true")
	port Accessories : Accessory [0..2] {
	}

}

type Apple : Phone {}

type Samsung : Phone {}

type Xiaomi : Phone {}

type Accessory {
	string power = ["3W","5W"];
	string color = ["Black","White"];

	@(domainComputation="true", priceOptions="true")
	port Cares : Care [0..2] {
	}

}

type Care {}

type Plan {}

type Delivery {}

