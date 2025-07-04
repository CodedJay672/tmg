import { config } from "@/lib/server/config";
import { calculatePriceByLocation, formatCurrency } from "@/lib/utils";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = config.baseUrl ? config.baseUrl : "http://localhost:3000";

interface TransactionEmailProps {
  transactionDetails: TableTypeProps[] | undefined;
  vat: number;
  date: string;
  transactionId: string;
  orderId: string;
  subTotal: number;
  total: number;
  customer: {
    fullname: string;
    email: string;
    phone: string;
  };
  billing: {
    name: string;
    location: string;
    charge: number;
    address: string;
    phone: string;
  };
}

export const TransactionEmail: React.FC<TransactionEmailProps> = ({
  transactionDetails,
  transactionId,
  orderId,
  vat,
  subTotal,
  total,
  date,
  customer,
  billing,
}) => (
  <Html>
    <Head />

    <Body style={main}>
      <Preview>tmg procurement</Preview>
      <Container style={container}>
        <Section>
          <Row>
            <Column>
              <Img
                src={`${baseUrl}/public/assets/logo.png`}
                width="42"
                height="42"
                alt="tmg logo"
              />
            </Column>

            <Column align="right" style={tableCell}>
              <Text style={heading}>BOQ</Text>
            </Column>
          </Row>
        </Section>
        <Section style={informationTable}>
          <Row style={informationTableRow}>
            <Column colSpan={2}>
              <Section>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>CUSTOMER EMAIL</Text>
                    <Text
                      style={{
                        ...informationTableValue,
                        color: "#15c",
                        textDecoration: "underline",
                      }}
                    >
                      {customer?.email}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>INVOICE DATE</Text>
                    <Text style={informationTableValue}>{date}</Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>ORDER ID</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: "#15c",
                        textDecoration: "underline",
                      }}
                    >
                      {orderId}
                    </Link>
                  </Column>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>TRANSACTION ID</Text>
                    <Text style={informationTableValue}>
                      {transactionId ?? "test"}
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Column>
            <Column style={informationTableColumn} colSpan={2}>
              <Text style={informationTableLabel}>BILLED TO</Text>
              <Text style={informationTableValue}>{billing.name}</Text>
              <Text style={informationTableValue}>
                {billing.location ?? "test"} - {billing.phone ?? "test"}
              </Text>
              <Text style={informationTableValue}>
                {billing.address ?? "test"}
              </Text>
              <Text style={informationTableValue ?? "test"}>
                {billing.location ?? "test"}
              </Text>
            </Column>
          </Row>
        </Section>
        <Section style={productTitleTable}>
          <Text style={productsTitle}>TMG online Store</Text>
        </Section>
        <Section>
          {transactionDetails?.map((product) => (
            <Row key={product?.product?.$id}>
              <Column style={{ width: "64px" }}>
                <Img
                  src={product.product.imgUrl}
                  width="64"
                  height="64"
                  alt={product.product.name}
                  style={productIcon}
                />
              </Column>
              <Column style={{ paddingLeft: "22px" }}>
                <Text style={productTitle}>{product.product.name}</Text>
                <Text style={productDescription}>
                  {product.product.description}
                </Text>
                <Text style={productDescription}>{product.qty}</Text>
              </Column>

              <Column style={productPriceWrapper} align="right">
                <Text style={productPrice}>
                  {formatCurrency(
                    calculatePriceByLocation(
                      product.product.price,
                      product.location?.charge
                    )
                  )}
                </Text>
              </Column>
            </Row>
          ))}
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>SUBTOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine} />
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>{formatCurrency(subTotal)}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>VAT (7.5%)</Text>
            </Column>
            <Column style={productPriceVerticalLine} />
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>{formatCurrency(vat)}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine} />
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>{formatCurrency(total)}</Text>
            </Column>
          </Row>
        </Section>

        <Hr style={productPriceLine} />
        <Section>
          <Text style={productsTitle}>Account Details</Text>
          <Row>
            <Column style={tableCell}>
              <Text style={productsTitle}>Account Name</Text>
            </Column>
            <Column>
              <Text>Much Grace Integrated Serv</Text>
            </Column>
          </Row>
          <Row>
            <Column style={tableCell}>
              <Text style={productsTitle}>Account No.</Text>
            </Column>
            <Column>
              <Text>0951630229</Text>
            </Column>
          </Row>
          <Row>
            <Column style={tableCell}>
              <Text style={productsTitle}>Bank Name</Text>
            </Column>
            <Column>GTBank PLC</Column>
          </Row>
        </Section>

        <Hr style={productPriceLine} />
        <Section>
          <Text style={productsTitle}>CONTACT US</Text>
          <Text style={informationTableValue}>Phone: 08135637156</Text>
          <Text style={informationTableValue}>
            Email: info@tmgprocurement.com
          </Text>
          <Text style={informationTableValue}>
            Website: www.tmgprocurement.com
          </Text>
        </Section>

        <Section>
          <Row>
            <Column align="center" style={footerIcon}>
              <Img
                src={`${baseUrl}/assets/logo.png`}
                width="26"
                height="26"
                alt="tmg logo"
              />
            </Column>
          </Row>
        </Section>
        <Text style={footerLinksWrapper}>
          <Link href="https://www.tmgprocurement.com/">Account Settings</Link> •{" "}
          <Link href="https://www.tmgprocurement.com/">Terms of Sale</Link> •{" "}
          <Link href="https://www.tmgprocurement.com/">Privacy Policy </Link>
        </Text>
        <Text style={footerCopyright}>
          Copyright ©{new Date().getFullYear()} TMG Procurement <br />{" "}
          <Link href="https://www.tmgprocurement.com">All rights reserved</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const cupomText = {
  textAlign: "center" as const,
  margin: "36px 0 40px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
};

const supStyle = {
  fontWeight: "300",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
  marginTop: "10px",
};

const informationTableRow = {
  minHeight: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  minHeight: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  minHeight: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgb(242,242,242)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  minHeight: "48px",
  paddingTop: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const footerIcon = { display: "block", margin: "40px 0 0 0" };

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};
