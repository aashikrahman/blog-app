import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="form">
        <div className="container">
          <div className="wrapper">
            <div className="login-form">
              <h2>Login</h2>
              <form action="">
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
                <p>
                  if you already member <Link href="/register">Register</Link>
                </p>
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
