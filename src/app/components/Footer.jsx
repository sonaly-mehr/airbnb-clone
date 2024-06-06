import React from "react";

const Footer = () => {
  return (
    <footer class="bg-[#F7F7F7] mt-16">
      <div class="container mx-auto px-5 lg:px-10 pt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 lg:gap-1 border-b-[1px] border-solid border-gray-300 pb-10">
        <div class="text-gray-800 text-xs lg:text-sm space-y-4">
          <h5 class="font-bold">ABOUT</h5>
          <p>How Airbnb works</p>
          <p>Newsroom</p>
          <p>Investors</p>
          <p>Airbnb Plus</p>
          <p>Airbnb Luxe</p>
        </div>
        <div class="space-y-4 text-xs lg:text-sm text-gray-800">
          <h5 class="font-bold">COMMUNITY</h5>
          <p>Accessibility</p>
          <p>Diversity & Belonging</p>
          <p>Frontline Stays</p>
          <p>Guest Referrals</p>
          <p>Gift cards</p>
        </div>
        <div class="space-y-4 text-xs lg:text-sm text-gray-800">
          <h5 class="font-bold">HOST</h5>
          <p>Host your home</p>
          <p>Host an Online Experience</p>
          <p>Responsible hosting</p>
          <p>Resource Center</p>
          <p>Community Center</p>
        </div>
        <div class="space-y-4 text-xs lg:text-sm text-gray-800">
          <h5 class="font-bold">SUPPORT</h5>
          <p>Our COVID-19 Response</p>
          <p>Help Center</p>
          <p>Cancellation options</p>
          <p>Neighborhood Support</p>
          <p>Trust & Safety</p>
        </div>
        </div>

        <div className="flex justify-center items-center text-xs lg:text-sm text-gray-800 py-7">
          <span>
            © 2024 Airbnb, Inc. · Terms SitemapPrivacyYour Privacy Choices
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
