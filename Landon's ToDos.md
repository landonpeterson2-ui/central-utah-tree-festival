# Volunteer Portal Setup Checklist

## MailerLite Setup (All-in-One Solution)

### 1. Create MailerLite Account
- [ ] Go to [mailerlite.com](https://www.mailerlite.com) and sign up (free up to 1,000 subscribers)
- [ ] Verify your email address
- [ ] Complete account setup (add organization name, address, etc.)
- [ ] Verify your sending domain (optional but improves deliverability)

### 2. Create Subscriber Group
- [ ] Go to **Subscribers** → **Groups**
- [ ] Click **Create group**
- [ ] Name it **"2025 Volunteers"**
- [ ] Save

### 3. Create Custom Fields
- [ ] Go to **Subscribers** → **Subscriber fields**
- [ ] Click **Create field** for each:

| Field Name | Type |
|------------|------|
| `phone` | Text |
| `age_group` | Text |
| `tshirt` | Text |
| `roles` | Text |
| `shifts` | Text |
| `skills` | Text |
| `how_heard` | Text |
| `emergency_contact` | Text |
| `shift_date` | Date |
| `shift_time` | Text |
| `assigned_role` | Text |

*Note: `name`, `last_name`, and `email` already exist by default*

### 4. Create Volunteer Signup Form
- [ ] Go to **Forms** → **Create form**
- [ ] Choose **Embedded form**
- [ ] Name it: "Volunteer Signup Form"
- [ ] Design the form with these fields:
  - First Name (text, required)
  - Last Name (text, required)
  - Email (email, required)
  - Phone Number (text, required)
  - Age Group (dropdown: 16-17, 18-25, 26-40, 41-60, 60+)
  - T-Shirt Size (dropdown: S, M, L, XL, 2XL, 3XL)
  - Preferred Role(s) (checkboxes: Greeter, Auction Support, Tree Guide, Ticket Sales, Setup Crew, Breakdown Crew, Flexible)
  - Availability/Shifts (checkboxes with your shift times)
  - Special Skills or Experience (textarea, optional)
  - How did you hear about us? (dropdown)
  - Emergency Contact Name & Phone (text)
- [ ] Under **Settings**, assign form to group: **"2025 Volunteers"**
- [ ] Customize the success message: "Thank you for signing up! Check your email for confirmation."
- [ ] Style the form to match your website colors
- [ ] Save and publish the form
- [ ] Copy the embed code

### 5. Add Form to Website
- [ ] Open `src/volunteers.njk` (or `volunteers.html`)
- [ ] Replace the Google Form iframe with the MailerLite embed code
- [ ] Test that the form displays correctly
- [ ] Submit a test entry

### 6. Create Email Templates
- [ ] Go to **Campaigns** → **Templates**
- [ ] Click **Create template**

#### Email 1: Confirmation (Sent Immediately)
- [ ] Name: "Volunteer Confirmation"
- [ ] Subject: `You're In! Welcome to the Volunteer Team`
- [ ] Preview text: `Thank you for signing up to volunteer at Central Utah Tree Festival`
- [ ] Body content:
```
Hi {$name}!

Thank you for signing up to volunteer at the Central Utah Tree Festival! We're thrilled to have you on board.

Here's what you signed up for:
- Preferred Role(s): {$roles}
- Available Shifts: {$shifts}

What happens next?
1. We'll review all volunteer signups
2. You'll receive your shift assignment 2-3 weeks before the event
3. We'll send you a reminder the day before your shift

Questions? Reply to this email or contact us at info@centralutahtreefestival.org

Thank you for helping us bring Christmas joy to families in need!

— The Central Utah Tree Festival Team
```
- [ ] Save template

#### Email 2: Shift Assignment (Send manually 2-3 weeks before)
- [ ] Name: "Volunteer Shift Assignment"
- [ ] Subject: `Your Volunteer Shift is Confirmed!`
- [ ] Preview text: `Here are the details for your volunteer shift`
- [ ] Body content:
```
Hi {$name}!

Great news — your volunteer shift has been assigned!

YOUR SHIFT DETAILS:
- Date: {$shift_date}
- Time: {$shift_time}
- Role: {$assigned_role}
- T-Shirt Size: {$tshirt}

LOCATION:
[Venue Name]
[Venue Address]

WHAT TO BRING:
- Comfortable shoes (you'll be on your feet!)
- A smile and festive spirit

PARKING:
[Parking instructions]

Please arrive 15 minutes early to check in and get your volunteer t-shirt.

Can't make it? Please let us know ASAP so we can reassign your spot.

See you soon!
— The Central Utah Tree Festival Team
```
- [ ] Save template

#### Email 3: Day-Before Reminder (Send manually day before)
- [ ] Name: "Volunteer Reminder"
- [ ] Subject: `See You Tomorrow!`
- [ ] Preview text: `Quick reminder about your volunteer shift`
- [ ] Body content:
```
Hi {$name}!

Just a friendly reminder — you're volunteering TOMORROW!

QUICK DETAILS:
- Date: {$shift_date}
- Time: {$shift_time}
- Role: {$assigned_role}

Remember to arrive 15 minutes early for check-in.

Emergency contact: [Coordinator Name] at [Phone Number]

Thank you for giving your time to help families in our community!

— The Central Utah Tree Festival Team
```
- [ ] Save template

#### Email 4: Thank You (Send manually day after event)
- [ ] Name: "Volunteer Thank You"
- [ ] Subject: `THANK YOU for Volunteering!`
- [ ] Preview text: `Your impact at the Central Utah Tree Festival`
- [ ] Body content:
```
Hi {$name}!

WOW. Thank you!

Because of volunteers like you, the Central Utah Tree Festival was a huge success!

BY THE NUMBERS:
- [X] families received Christmas trees
- [X] trees were donated and decorated
- $[X] was raised for families in need
- [X] volunteers made it all possible

You made a real difference in our community. Thank you for your time, energy, and heart.

We'd love to hear from you! Reply to this email with:
- Your favorite moment from the festival
- Any suggestions for next year
- Photos you took (we might feature them!)

Until next year,
— The Central Utah Tree Festival Team

P.S. Follow us on social media to see photos and stories from this year's event!
```
- [ ] Save template

### 7. Create Automation (Welcome Email)
- [ ] Go to **Automations** → **Create automation**
- [ ] Choose **Start from scratch**
- [ ] Name it: "Volunteer Welcome Sequence"

#### Set Trigger
- [ ] Click **Add trigger**
- [ ] Select **"When subscriber joins a group"**
- [ ] Choose group: **"2025 Volunteers"**
- [ ] Save trigger

#### Add Confirmation Email
- [ ] Click **+** below trigger
- [ ] Select **Email**
- [ ] Choose template: "Volunteer Confirmation"
- [ ] Save

#### Activate
- [ ] Review workflow
- [ ] Click **Activate** (top right)

---

## Sending Event Emails (Manual Steps)

### Email 2: Shift Assignment (2-3 weeks before event)
- [ ] Go to **Subscribers** → **Groups** → "2025 Volunteers"
- [ ] Update each subscriber's `shift_date`, `shift_time`, `assigned_role` fields
- [ ] Go to **Campaigns** → **Create campaign**
- [ ] Choose **Regular campaign**
- [ ] Select recipients: "2025 Volunteers" group
- [ ] Use template: "Volunteer Shift Assignment"
- [ ] Review and send

### Email 3: Day-Before Reminder
- [ ] Go to **Campaigns** → **Create campaign**
- [ ] Select recipients: "2025 Volunteers" group
- [ ] Use template: "Volunteer Reminder"
- [ ] Schedule for day before event (or send immediately)

### Email 4: Thank You (Day after event)
- [ ] Go to **Campaigns** → **Create campaign**
- [ ] Select recipients: "2025 Volunteers" group
- [ ] Use template: "Volunteer Thank You"
- [ ] Update with actual impact numbers before sending
- [ ] Send

---

## Pre-Event Checklist

### 2-3 Weeks Before
- [ ] Review volunteer signups in MailerLite
- [ ] Assign shifts and roles
- [ ] Update subscriber fields with assignments (shift_date, shift_time, assigned_role)
- [ ] Send shift assignment emails (Email 2)
- [ ] Order volunteer t-shirts based on sizes in MailerLite

### 1 Week Before
- [ ] Confirm all volunteers received assignments
- [ ] Follow up with anyone who hasn't responded
- [ ] Prepare check-in materials

### Day Before
- [ ] Send reminder emails (Email 3)
- [ ] Export volunteer list from MailerLite for check-in
- [ ] Prepare t-shirts and name tags

### Day After Event
- [ ] Send thank you emails (Email 4)
- [ ] Collect volunteer feedback

---

## Website Updates Needed

### Before Volunteer Page Goes Live
- [ ] Replace Google Form with MailerLite embed code
- [ ] Update shift dates in volunteers page (currently says "December 2025" with placeholder times)
- [ ] Add venue address once confirmed

---

## MailerLite Merge Tags Reference

Use these in your email templates:

| Data | Merge Tag |
|------|-----------|
| First Name | `{$name}` |
| Last Name | `{$last_name}` |
| Email | `{$email}` |
| Phone | `{$phone}` |
| Roles | `{$roles}` |
| Shifts | `{$shifts}` |
| T-Shirt Size | `{$tshirt}` |
| Shift Date | `{$shift_date}` |
| Shift Time | `{$shift_time}` |
| Assigned Role | `{$assigned_role}` |

---

## Support

- MailerLite Help: [help.mailerlite.com](https://help.mailerlite.com)

---

## Future Site Improvements

Based on research of similar Festival of Trees websites, here are additional enhancements to consider:

### High Priority (Drives Engagement & Donations)

#### Family Impact Stories
- [ ] Create "Families We've Helped" section on About page or homepage
- [ ] Gather 2-3 anonymized family stories (with permission)
- [ ] Add photos if families consent
- [ ] Include quote boxes with testimonials

#### Tree/Auction Preview Gallery
- [ ] Add "Preview the Trees" section before auction opens
- [ ] Show each tree with donor name, theme, and description
- [ ] Link to Givebutter auction items
- [ ] Add "Notify me when bidding opens" email capture

### Medium Priority (Improves User Experience)

#### Interactive Event Schedule
- [ ] Create schedule section on homepage or dedicated page
- [ ] Show day-by-day activities with times
- [ ] Include: tree viewing hours, entertainment, Santa visits, auction closing

#### Venue & Map Section
- [ ] Add Google Maps embed for event location
- [ ] Include parking information
- [ ] Add directions from major nearby cities
- [ ] Add accessibility information

#### Kids/Family Activities Section
- [ ] Highlight activities for children
- [ ] Create printable activity sheet (PDF)

### Lower Priority (Nice to Have)

#### Live Social Media Feed
- [ ] Embed Instagram feed on homepage
- [ ] Options: Curator.io, Taggbox, or SnapWidget (free tiers available)

#### Enhanced Sponsor Showcase
- [ ] Make sponsor logos clickable (link to their websites)
- [ ] Add hover animations to sponsor cards

#### Sticky Mobile Donate Button
- [ ] Add fixed "Donate" button on mobile (bottom of screen)
- [ ] Shows on scroll, disappears at footer
