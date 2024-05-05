const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-screen-xl mx-auto py-8 px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="text-sm uppercase mb-2">About</h5>
          <ul className="text-xs">
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Team</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm uppercase mb-2">Services</h5>
          <ul className="text-xs">
            <li>
              <a href="#">Consulting</a>
            </li>
            <li>
              <a href="#">Sales</a>
            </li>
            <li>
              <a href="#">Rentals</a>
            </li>
            <li>
              <a href="#">Property Management</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm uppercase mb-2">Support</h5>
          <ul className="text-xs">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm uppercase mb-2">Follow Us</h5>
          <ul className="text-xs">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-gray-700">
        &copy; 2023 NoBiStore, Inc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
