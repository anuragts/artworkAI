import Footer from "./Footer";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <link
        href="https://api.fontshare.com/v2/css?f[]=chillax@600,500,300,700,400,200&display=swap"
        rel="stylesheet"
      ></link>
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
