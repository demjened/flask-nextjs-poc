"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const WSCRIPTED_API_BASE_URL = "http://localhost:5000";

export default function Home() {
  const [error, setError] = useState(null);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${WSCRIPTED_API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const response_json = await response.json();
    if (response_json["success"]) {
      router.push("/dashboard");
    } else {
      setError(response_json["error"]);
    }
  }

  return (
    <>
      <h2>Login</h2>
      <center>
        <p>Enter an email address ending with wscripted.co to log in, or any other address to simulate an error. Use any random string for the password.</p>
      </center>
      {error && <p className="error">{error}</p>}
      <div className="index-body">
        <div className="index-container">
          <div className="index-form-container">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <div className="form-group">
                <div id="cloudflare_captcha"></div>
              </div>

              <div className="form-group">
                <button type="submit">Log In</button>
              </div>
              <div className="forgot-password-link">
                <a href="#" id="forgot-password-link">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
