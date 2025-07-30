# HopNGo UI Design Specification

## Design System Overview

HopNGo follows a clean, modern design philosophy focused on **simplicity**, **clarity**, and **efficiency**. The interface prioritizes user experience with intuitive navigation and clear visual hierarchy.

## Color Palette

### Primary Colors
- **Primary Blue**: `#2196F3` - Used for main CTAs and branding
- **Secondary Green**: `#4CAF50` - Success states and confirmation buttons
- **Accent Orange**: `#FF9800` - Highlighting best deals and notifications

### Neutral Colors
- **Dark Gray**: `#212121` - Primary text and headers
- **Medium Gray**: `#757575` - Secondary text and descriptions
- **Light Gray**: `#F5F5F5` - Background and card containers
- **White**: `#FFFFFF` - Card backgrounds and input fields

### Status Colors
- **Success Green**: `#4CAF50` - Successful bookings
- **Warning Orange**: `#FF9800` - Price alerts
- **Error Red**: `#F44336` - Error states
- **Info Blue**: `#2196F3` - Information and tips

## Typography

### Font Family
- **Primary**: `Roboto` - Clean, readable, and professional
- **Fallback**: `Helvetica Neue`, `Arial`, `sans-serif`

### Font Scales
- **H1 (Page Headers)**: 32px, Bold, `#212121`
- **H2 (Section Headers)**: 24px, Bold, `#212121`
- **H3 (Card Titles)**: 18px, Medium, `#212121`
- **Body Text**: 16px, Regular, `#757575`
- **Caption Text**: 14px, Regular, `#757575`
- **Button Text**: 16px, Medium, `#FFFFFF`

## Layout & Spacing

### Grid System
- **Container Max Width**: 1200px
- **Columns**: 12-column grid
- **Gutters**: 24px between columns
- **Margins**: 16px (mobile), 24px (tablet), 32px (desktop)

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

## Components Specification

### 1. App Bar
```dart
AppBar(
  height: 64px,
  backgroundColor: Colors.white,
  elevation: 2,
  title: Text('HopNGo', style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Color(0xFF2196F3)
  )),
  actions: [
    IconButton(icon: Icon(Icons.menu), onPressed: () {}),
  ],
)
```

### 2. Location Input Cards
```dart
Card(
  elevation: 4,
  borderRadius: BorderRadius.circular(12),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      children: [
        // Pickup Location
        LocationInputField(
          icon: Icons.my_location,
          hint: 'Pickup location',
          iconColor: Color(0xFF4CAF50),
        ),
        Divider(height: 24),
        // Destination
        LocationInputField(
          icon: Icons.location_on,
          hint: 'Where to?',
          iconColor: Color(0xFFF44336),
        ),
      ],
    ),
  ),
)
```

### 3. Ride Comparison Card
```dart
Card(
  elevation: 2,
  borderRadius: BorderRadius.circular(12),
  child: InkWell(
    borderRadius: BorderRadius.circular(12),
    onTap: () => _bookRide(),
    child: Padding(
      padding: EdgeInsets.all(16),
      child: Row(
        children: [
          // Platform Logo
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              image: DecorationImage(
                image: AssetImage('assets/logos/platform.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          SizedBox(width: 16),
          // Ride Details
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Uber Go',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.medium,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  '5-7 mins away',
                  style: TextStyle(
                    fontSize: 14,
                    color: Color(0xFF757575),
                  ),
                ),
              ],
            ),
          ),
          // Price and Status
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '₹185',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF212121),
                ),
              ),
              if (isCheapest)
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: Color(0xFF4CAF50),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    'Cheapest',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.white,
                      fontWeight: FontWeight.medium,
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    ),
  ),
)
```

### 4. Floating Action Button
```dart
FloatingActionButton.extended(
  backgroundColor: Color(0xFF2196F3),
  onPressed: () => _compareRides(),
  icon: Icon(Icons.compare_arrows, color: Colors.white),
  label: Text(
    'Compare Rides',
    style: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.medium,
      color: Colors.white,
    ),
  ),
)
```

### 5. Loading Indicator
```dart
Container(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      CircularProgressIndicator(
        valueColor: AlwaysStoppedAnimation<Color>(Color(0xFF2196F3)),
        strokeWidth: 3,
      ),
      SizedBox(height: 16),
      Text(
        'Finding best rides...',
        style: TextStyle(
          fontSize: 16,
          color: Color(0xFF757575),
        ),
      ),
    ],
  ),
)
```

## Screen Layouts

### 1. Home Screen
- **Header**: App logo and menu
- **Location Input**: Pickup and destination fields
- **Quick Actions**: Recent destinations, favorites
- **Compare Button**: Primary CTA to start comparison

### 2. Comparison Screen
- **Header**: Route summary (From → To)
- **Filter Bar**: Sort by price, time, platform
- **Ride List**: Scrollable list of available rides
- **Bottom Sheet**: Selected ride details

### 3. Booking Screen
- **Ride Summary**: Selected platform and vehicle type
- **Map View**: Route visualization
- **Driver Details**: Photo, name, rating, contact
- **Action Buttons**: Call, message, cancel

## Responsive Design

### Mobile (320px - 768px)
- Single column layout
- Full-width cards
- Bottom navigation
- Swipe gestures for navigation

### Tablet (768px - 1024px)
- Two-column layout for ride comparisons
- Side navigation panel
- Larger touch targets
- Horizontal scrolling for ride options

### Desktop (1024px+)
- Three-column layout
- Fixed sidebar navigation
- Hover states for interactive elements
- Keyboard navigation support

## Accessibility

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Screen Reader**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Tab order and focus indicators

### Inclusive Design
- **High Contrast Mode**: Alternative color scheme
- **Large Text Support**: Scalable font sizes
- **Motor Accessibility**: Large touch targets, voice commands
- **Cognitive Accessibility**: Clear labels, consistent patterns

## Animation & Interactions

### Micro-Interactions
- **Button Press**: Scale down to 0.95 with haptic feedback
- **Card Hover**: Elevation increase from 2dp to 8dp
- **Page Transitions**: Slide in from right (200ms ease-out)
- **Loading States**: Skeleton screens with shimmer effect

### Page Transitions
```dart
PageRouteBuilder(
  pageBuilder: (context, animation, secondaryAnimation) => NextPage(),
  transitionsBuilder: (context, animation, secondaryAnimation, child) {
    return SlideTransition(
      position: animation.drive(
        Tween(begin: Offset(1.0, 0.0), end: Offset.zero).chain(
          CurveTween(curve: Curves.easeInOut),
        ),
      ),
      child: child,
    );
  },
  transitionDuration: Duration(milliseconds: 200),
)
```

## Icons & Imagery

### Icon Set
- **Material Design Icons**: Primary icon library
- **Custom Icons**: Brand-specific elements
- **Platform Logos**: Ola, Uber, Rapido official logos
- **Vehicle Types**: Car, auto, bike illustrations

### Image Guidelines
- **Resolution**: 2x and 3x variants for high-DPI screens
- **Format**: PNG for icons, WebP for photos
- **Optimization**: Compressed for web performance
- **Alt Text**: Descriptive text for accessibility

## Platform-Specific Considerations

### Web
- **Progressive Web App**: Installable, offline-capable
- **Browser Support**: Chrome 80+, Firefox 75+, Safari 13+
- **Performance**: Lazy loading, code splitting
- **SEO**: Meta tags, structured data

### Future Mobile Apps
- **iOS**: Human Interface Guidelines compliance
- **Android**: Material Design 3 implementation
- **Native Features**: Biometric auth, push notifications
- **Platform Integration**: Deep linking, share sheets

## Design Tokens

### Border Radius
- **Small**: 4px (buttons, chips)
- **Medium**: 8px (cards, inputs)
- **Large**: 12px (modals, sheets)
- **Extra Large**: 16px (hero elements)

### Shadows
- **Level 1**: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
- **Level 2**: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`
- **Level 3**: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`
- **Level 4**: `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`

## Implementation Guidelines

### Code Organization
```
lib/presentation/
├── themes/
│   ├── app_theme.dart
│   ├── colors.dart
│   ├── typography.dart
│   └── spacing.dart
├── widgets/
│   ├── common/
│   ├── cards/
│   ├── buttons/
│   └── inputs/
└── pages/
    ├── home/
    ├── comparison/
    └── booking/
```

### Theme Implementation
```dart
class AppTheme {
  static ThemeData lightTheme = ThemeData(
    primarySwatch: Colors.blue,
    primaryColor: Color(0xFF2196F3),
    scaffoldBackgroundColor: Color(0xFFF5F5F5),
    fontFamily: 'Roboto',
    textTheme: TextTheme(
      headline1: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
      headline2: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
      bodyText1: TextStyle(fontSize: 16, color: Color(0xFF757575)),
    ),
    cardTheme: CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ),
  );
}
```

This design specification ensures consistency across the entire HopNGo application while maintaining flexibility for future enhancements and platform-specific adaptations.