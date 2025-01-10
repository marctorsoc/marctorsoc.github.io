interface ProfileSidebarProps {
  name: string;
  tagline: string;
  location: string;
  avatarUrl: string;
  socialLinks: {
    type: 'linkedin' | 'github' | 'google-scholar' | 'other';
    url: string;
  }[];
}

export default function ProfileSidebar({ 
  name, 
  tagline, 
  location, 
  avatarUrl,
  socialLinks 
}: ProfileSidebarProps) {
  return (
    <div className="sticky top-4">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="w-36 h-36 rounded-full overflow-hidden mb-4 transition-opacity duration-300 opacity-80 hover:opacity-100">
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400">{tagline}</p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <span>{location}</span>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
              aria-label={link.type}
            >
              {link.type === 'linkedin' ? (
                <svg className="w-6 h-6" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              ) : link.type === 'github' ? (
                <div className="w-6 h-6">
                  <img 
                    src="https://user-images.githubusercontent.com/3369400/139448065-39a229ba-4b06-434b-bc67-616e2ed80c8f.png"
                    alt="GitHub"
                    className="dark:hidden w-full h-full"
                  />
                  <img 
                    src="https://user-images.githubusercontent.com/3369400/139447912-e0f43f33-6d9f-45f8-be46-2df5bbc91289.png"
                    alt="GitHub"
                    className="hidden dark:block w-full h-full"
                  />
                </div>
              ) : link.type === 'google-scholar' ? (
                <svg className="w-6 h-6" viewBox="0 0 512 512">
                  <path fill="#4285f4" d="M256 411.12L0 202.667 256 0z" />
                  <path fill="#356ac3" d="M256 411.12l256-208.453L256 0z" />
                  <circle fill="#a0c3ff" cx="256" cy="362.667" r="149.333" />
                  <path fill="#76a7fa" d="M121.037 298.667c23.968-50.453 75.392-85.334 134.963-85.334s110.995 34.881 134.963 85.334H121.037z" />
                </svg>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 