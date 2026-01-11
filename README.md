# Transfer News Tracker

A premium dark-themed web application for tracking football transfer news from your favorite Twitter/X sources. Built with Next.js 15, TypeScript, Prisma, and NextAuth.js.

## Features

- 🔐 **User Authentication** - Secure login with email/password or Google OAuth
- 👤 **Profile Management** - Follow/unfollow Twitter profiles of transfer news experts
- 📰 **Personalized Feed** - View transfer news from your followed profiles
- ⚽ **Team Logos** - Beautiful team badges powered by TheSportsDB API
- 💾 **User Preferences** - Save your favorite team and notification settings
- 🎨 **Premium Dark UI** - Sleek, modern interface with glass-morphism effects
- 📱 **Responsive Design** - Works beautifully on all devices

## Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 6.14.0
- **Authentication**: NextAuth.js v5
- **Icons**: Lucide React
- **API Integration**: Twitter API v2, TheSportsDB API

## Prerequisites

Before you begin, ensure you have:

- Node.js 20.5.0 or higher
- PostgreSQL database (Supabase recommended)
- Twitter API credentials (optional, for fetching real tweets)
- Google OAuth credentials (optional, for Google sign-in)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd transfer-news-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Update the `.env` file with your credentials:

```env
# Database
DATABASE_URL="your-postgresql-url"
SHADOW_DATABASE_URL="your-postgresql-shadow-url"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate using: openssl rand -base64 32>"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Twitter API v2 (Add when you have them)
TWITTER_API_KEY="your-twitter-api-key"
TWITTER_API_SECRET="your-twitter-api-secret"
TWITTER_BEARER_TOKEN="your-twitter-bearer-token"
TWITTER_ACCESS_TOKEN="your-twitter-access-token"
TWITTER_ACCESS_TOKEN_SECRET="your-twitter-access-token-secret"

# TheSportsDB API
SPORTS_DB_API_KEY="3"

# App Configuration
NODE_ENV="development"
```

### 4. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and update `NEXTAUTH_SECRET` in `.env`

### 5. Set Up Database

Run Prisma migrations to create database tables:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 6. Seed Initial Team Data (Optional)

Create a seed file or manually add teams to your database. The app includes these teams:

- AC Milan, Ajax, Arsenal, AS Monaco, Aston Villa
- Atletico Madrid, Barcelona, Bayern Munich, Besiktas
- Borussia Dortmund, Chelsea, Fenerbache, Galatasaray
- Inter Milan, Juventus, Lille, Liverpool, Manchester City
- Manchester United, Napoli, Newcastle, PSG, RB Leipzig
- Real Madrid, Roma, Tottenham Hotspur

### 7. Sync Team Logos

After starting the app, you can sync team logos from TheSportsDB:

```bash
curl -X POST http://localhost:3000/api/teams/sync-logos
```

Or visit `/api/teams/sync-logos` in your browser after deployment.

### 8. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
transfer-news-tracker/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth.js endpoints
│   │   │   ├── profiles/     # Profile management
│   │   │   ├── tweets/       # Tweet feed
│   │   │   ├── preferences/  # User settings
│   │   │   └── teams/        # Team data & logos
│   │   ├── auth/             # Sign in/up pages
│   │   ├── dashboard/        # Protected dashboard
│   │   │   ├── profiles/     # Profile management page
│   │   │   └── settings/     # User settings page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css       # Global styles
│   └── lib/
│       ├── auth.ts           # NextAuth configuration
│       ├── prisma.ts         # Prisma client
│       └── twitter.ts        # Twitter API client
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── dashboard/            # Dashboard components
│   ├── profiles/             # Profile components
│   ├── tweets/               # Tweet components
│   └── teams/                # Team components
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## API Routes

### Authentication
- `POST /api/auth/signup` - Create new account
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js handler

### Profiles
- `GET /api/profiles` - Get followed profiles
- `POST /api/profiles` - Follow a profile
- `DELETE /api/profiles/[id]` - Unfollow a profile

### Tweets
- `GET /api/tweets` - Get tweets from followed profiles
- Query params: `teamId`, `limit`, `offset`

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams/sync-logos` - Sync team logos

### Preferences
- `GET /api/preferences` - Get user preferences
- `PUT /api/preferences` - Update preferences

## Database Schema

### Main Models

- **User** - User accounts with NextAuth
- **TwitterProfile** - Twitter accounts to follow
- **TwitterProfileFollow** - User → Profile relationships
- **Team** - Football teams with logos
- **Tweet** - Transfer news tweets
- **UserPreferences** - User settings & favorite team

## Usage

### 1. Create an Account
- Visit the landing page
- Click "Get Started" or "Sign Up"
- Create account with email/password or Google

### 2. Follow Twitter Profiles
- Go to Dashboard → Profiles
- Click "Add Profile"
- Enter Twitter handle (e.g., @FabrizioRomano)
- Click "Add Profile"

### 3. View Transfer News
- Return to Dashboard
- See tweets from followed profiles
- Filter by team (coming soon with real Twitter data)

### 4. Customize Settings
- Go to Dashboard → Settings
- Set your favorite team
- Configure notifications
- Click "Save Changes"

## Twitter API Setup (Optional)

To fetch real tweets from Twitter:

1. Create a Twitter Developer account at [developer.twitter.com](https://developer.twitter.com)
2. Create a new app and generate API credentials
3. Add credentials to `.env`
4. The app will automatically fetch tweets from followed profiles

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform, especially:
- `DATABASE_URL`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- Twitter API credentials (if using)

## Troubleshooting

### Database Connection Issues

If Prisma migration fails:
1. Check your `DATABASE_URL` is correct
2. Ensure database is accessible
3. Try using direct connection URL instead of pooler

### NextAuth Errors

If you get authentication errors:
1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Clear browser cookies and try again

### Team Logos Not Loading

1. Run the logo sync endpoint: `POST /api/teams/sync-logos`
2. Check TheSportsDB API is accessible
3. Verify teams exist in database

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [TheSportsDB](https://www.thesportsdb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## Support

For issues and questions, please open an issue on GitHub.

---
