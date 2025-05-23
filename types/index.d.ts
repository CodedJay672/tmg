interface BottomBarProps {
  path: string;
  icon: React.ReactNode;
}

interface ProductUploadProps {
  name: string;
  price: string;
  imgUrl: string;
  category: string;
}

type TCart = {
  id: string;
  name: string;
  category: string;
  imgUrl: string;
  price: number;
  qty: number;
};

type TransactionEntryType = {
  userId?: string;
  order: TCart[];
  total: number;
  location: string;
  status: "CANCELLED" | "PROCESSING" | "COMPLETED";
  delivery_location: string;
  delivery_address: string;
  receiver_name: string;
  receiver_phone: string;
};

type TableTypeProps = {
  product: Models.Document;
  qty: number;
};
