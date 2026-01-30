# Volunteer Portal Setup Checklist

## BLOCKING: Production Readiness

These items **MUST** be completed before the volunteer page goes live:

### Critical (Form Won't Work Without These)
- [ ] **Create Google Form** for volunteer signups with these fields:
  - First Name, Last Name (short answer)
  - Email Address (short answer, email validation)
  - Phone Number (short answer)
  - Age Group (dropdown: 16-17, 18-25, 26-40, 41-60, 60+)
  - T-Shirt Size (dropdown: S, M, L, XL, 2XL, 3XL)
  - Preferred Role(s) (checkboxes: Greeter, Auction Support, Tree Guide, Ticket Sales, Setup Crew, Breakdown Crew, Flexible)
  - Availability/Shifts (checkboxes with your shift times)
  - Special Skills or Experience (long answer, optional)
  - How did you hear about us? (dropdown)
  - Emergency Contact Name & Phone (short answer)
- [ ] **Update volunteers.html** with your Google Form link
  - Get your form's shareable link from Google Forms
  - Replace `YOUR_GOOGLE_FORM_ID` in `volunteers.html` line 220
  - The ID is the long string after `/d/e/` in the URL

### Required Before Launch
- [ ] **Test the form** - Submit a test entry and verify it appears in Google Sheets

### Should Update Before Launch
- [ ] **Update shift dates** in `volunteers.html` lines 288-314 (currently says "December 2025" with generic times)
- [ ] **Add venue address** once confirmed (for email templates)
- [ ] **Add emergency contact phone** for volunteer coordinator (for email templates)
- [x] **Update footer links** - Add "Volunteer" link to footer on all pages (DONE)

---

<!--
## ARCHIVED: Web3Forms Setup (Not Currently Used)

The custom Web3Forms form has been commented out in volunteers.html in favor of
a simpler Google Forms approach. The code is preserved if you want to use it later.

### 1. Web3Forms API Key
- [ ] Go to [web3forms.com](https://web3forms.com)
- [ ] Enter your email to get a free access key
- [ ] Uncomment the form in `volunteers.html` and replace `YOUR_WEB3FORMS_ACCESS_KEY`

### 2. Test the Form
- [ ] Submit a test entry to verify emails are received
- [ ] Check that the success message displays after submission
-->

---

## MailerLite Setup

### 3. Create Subscriber Group
- [ ] Log in to [MailerLite](https://app.mailerlite.com)
- [ ] Go to **Subscribers** → **Groups**
- [ ] Click **Create group**
- [ ] Name it **"2025 Volunteers"**
- [ ] Save

### 4. Create Custom Fields
- [ ] Go to **Subscribers** → **Custom fields**
- [ ] Click **Create field** for each:

| Field Name | Type | Options |
|------------|------|---------|
| `first_name` | Text | (may already exist) |
| `last_name` | Text | (may already exist) |
| `phone` | Text | |
| `roles` | Text | |
| `shifts` | Text | |
| `tshirt` | Dropdown | S, M, L, XL, 2XL, 3XL |
| `shift_date` | Date | |
| `shift_time` | Text | |
| `assigned_role` | Text | |
| `emergency_contact` | Text | |

### 5. Create Email Templates
- [ ] Go to **Campaigns** → **Templates**
- [ ] Click **Create template**
- [ ] Create templates for each email (copy content from `email-templates/volunteer-email-sequence.md`):

#### Email 1: Confirmation
- [ ] Name: "Volunteer Confirmation"
- [ ] Subject: `You're In! Welcome to the Volunteer Team`
- [ ] Preview text: `Thank you for signing up to volunteer at Central Utah Tree Festival`
- [ ] Copy body content from template file
- [ ] Replace placeholders with merge tags: `{$name}`, `{$roles}`, `{$shifts}`
- [ ] Save template

#### Email 2: Shift Assignment
- [ ] Name: "Volunteer Shift Assignment"
- [ ] Subject: `Your Volunteer Shift is Confirmed!`
- [ ] Preview text: `Here are the details for your volunteer shift at the festival`
- [ ] Copy body content from template file
- [ ] Replace placeholders with merge tags: `{$name}`, `{$tshirt}`, `{$shift_date}`, `{$shift_time}`, `{$assigned_role}`
- [ ] Save template

#### Email 3: Day-Before Reminder
- [ ] Name: "Volunteer Reminder"
- [ ] Subject: `See You Tomorrow! Your Volunteer Shift Reminder`
- [ ] Preview text: `Quick reminder about your volunteer shift tomorrow`
- [ ] Copy body content from template file
- [ ] Save template

#### Email 4: Thank You
- [ ] Name: "Volunteer Thank You"
- [ ] Subject: `THANK YOU for Volunteering!`
- [ ] Preview text: `Your impact at the Central Utah Tree Festival`
- [ ] Copy body content from template file
- [ ] Save template

#### Email 5: Impact Update
- [ ] Name: "Volunteer Impact Update"
- [ ] Subject: `You Made a Difference (Here's Proof!)`
- [ ] Preview text: `See the families you helped this year`
- [ ] Copy body content from template file
- [ ] Save template

### 6. Create Automation Workflow
- [ ] Go to **Automations** → **Create automation**
- [ ] Choose **Start from scratch**
- [ ] Name it: "Volunteer Welcome Sequence"

#### Set Trigger
- [ ] Click **Add trigger**
- [ ] Select **"When subscriber joins a group"**
- [ ] Choose group: **"2025 Volunteers"**
- [ ] Save trigger

#### Add Email 1 (Confirmation)
- [ ] Click **+** below trigger
- [ ] Select **Email**
- [ ] Choose template: "Volunteer Confirmation"
- [ ] Review and save

#### Add Delay (Optional)
- [ ] Click **+** below Email 1
- [ ] Select **Delay**
- [ ] Set to **1 day** (for welcome spacing)

### 7. Activate Automation
- [ ] Review entire workflow
- [ ] Click **Activate** (top right)
- [ ] Confirm activation

---

## Connecting Form to MailerLite

### 8. Choose Integration Method

#### Option A: Manual (Free - Recommended to Start)
- [ ] When you receive a Web3Forms submission email, manually add the volunteer to MailerLite
- [ ] Go to **Subscribers** → **Add subscribers**
- [ ] Enter email and fill in custom fields
- [ ] Add to group: "2025 Volunteers"
- [ ] Automation triggers automatically

#### Option B: Zapier Integration (Free tier: 100 tasks/month)
- [ ] Create account at [zapier.com](https://zapier.com)
- [ ] Create new Zap
- [ ] Trigger: **Web3Forms** → New Submission
- [ ] Action: **MailerLite** → Add Subscriber to Group
- [ ] Map form fields to MailerLite custom fields
- [ ] Test and activate

#### Option C: Web3Forms Pro + Zapier ($8/mo)
- [ ] Upgrade Web3Forms for more submissions
- [ ] Use Zapier for reliable automation
- [ ] Same setup as Option B

---

## Sending Event Emails (Manual Steps)

### Email 2: Shift Assignment (2-3 weeks before)
- [ ] Go to **Subscribers** → **Groups** → "2025 Volunteers"
- [ ] Update each subscriber's `shift_date`, `shift_time`, `assigned_role` fields
- [ ] Go to **Campaigns** → **Create campaign**
- [ ] Use template: "Volunteer Shift Assignment"
- [ ] Send to group: "2025 Volunteers"
- [ ] Schedule or send immediately

### Email 3: Day-Before Reminder
- [ ] Go to **Campaigns** → **Create campaign**
- [ ] Use template: "Volunteer Reminder"
- [ ] Send to group: "2025 Volunteers"
- [ ] Schedule for day before event

### Email 4: Thank You (Day after event)
- [ ] Go to **Campaigns** → **Create campaign**
- [ ] Use template: "Volunteer Thank You"
- [ ] Update with actual impact numbers
- [ ] Send to group: "2025 Volunteers"

### Email 5: Impact Update (2-3 months later)
- [ ] Go to **Campaigns** → **Create campaign**
- [ ] Use template: "Volunteer Impact Update"
- [ ] Add family stories (with permission)
- [ ] Add final numbers
- [ ] Send to group: "2025 Volunteers"

---

## Optional Enhancements

<!--### 9. Google Sheets Integration
- [ ] In Web3Forms dashboard, connect to Google Sheets
- [ ] Create a "2025 Volunteers" spreadsheet
- [ ] Set up columns matching form fields
-->
### 10. Update Event Details
- [ ] Replace placeholder shift dates in `volunteers.html` (lines 241-267) with actual December 2025 schedule
- [ ] Update venue address once confirmed
- [ ] Add parking instructions to email templates

---

## Pre-Event Checklist

### 2-3 Weeks Before
- [ ] Review volunteer signups in Web3Forms/Google Sheets
- [ ] Assign shifts and roles
- [ ] Update MailerLite subscriber fields with assignments
- [ ] Send shift assignment emails (Email 2)
- [ ] Order volunteer t-shirts

### 1 Week Before
- [ ] Confirm all volunteers received assignments
- [ ] Follow up with anyone who hasn't responded
- [ ] Prepare check-in materials

### Day Before
- [ ] Send reminder emails (Email 3)
- [ ] Print volunteer check-in list from MailerLite/Sheets
- [ ] Prepare t-shirts and name tags

### Day After Event
- [ ] Send thank you emails (Email 4)
- [ ] Collect volunteer feedback
- [ ] Note any issues for next year

### 2-3 Months After
- [ ] Compile impact stats
- [ ] Gather family stories (with permission)
- [ ] Send impact update email (Email 5)

---

## Files Reference

| File | Purpose |
|------|---------|
| `volunteers.html` | Volunteer signup page |
| `styles.css` | Contains volunteer page styles (lines 2161-2500) |
| `email-templates/volunteer-email-sequence.md` | Email templates for MailerLite |
| `sitemap.xml` | Updated with volunteers page |

---

## MailerLite Merge Tags Reference

Use these in your email templates:

| Placeholder | MailerLite Tag |
|-------------|----------------|
| `{{name}}` | `{$name}` |
| `{{email}}` | `{$email}` |
| `{{roles}}` | `{$roles}` |
| `{{shifts}}` | `{$shifts}` |
| `{{tshirt}}` | `{$tshirt}` |
| `{{shift_date}}` | `{$shift_date}` |
| `{{shift_time}}` | `{$shift_time}` |
| `{{assigned_role}}` | `{$assigned_role}` |

---

## Support

Questions? Contact:
<!--- Web3Forms: support@web3forms.com -->
- MailerLite: help.mailerlite.com
- Zapier: zapier.com/help

---

## Future Site Improvements

Based on research of similar Festival of Trees websites, here are additional enhancements to consider:

### High Priority (Drives Engagement & Donations)

#### Family Impact Stories
- [ ] Create "Families We've Helped" section on About page or homepage
- [ ] Gather 2-3 anonymized family stories (with permission)
- [ ] Add photos if families consent
- [ ] Include quote boxes with testimonials
- [ ] Reference: Emotional storytelling increases donations significantly

#### Tree/Auction Preview Gallery
- [ ] Add "Preview the Trees" section before auction opens
- [ ] Show each tree with donor name, theme, and description
- [ ] Link to Givebutter auction items
- [ ] Add "Notify me when bidding opens" email capture
- [ ] Reference: Mall of America, Mass Horticultural Society do this

### Medium Priority (Improves User Experience)

#### Interactive Event Schedule
- [ ] Create schedule section on homepage or dedicated page
- [ ] Show day-by-day activities with times
- [ ] Include: tree viewing hours, entertainment, Santa visits, auction closing
- [ ] Make filterable by activity type
- [ ] Reference: Saint Alphonsus Festival of Trees

#### Venue & Map Section
- [ ] Add Google Maps embed for event location
- [ ] Include parking information
- [ ] Add directions from major nearby cities
- [ ] List nearby hotels/accommodations for out-of-town visitors
- [ ] Add accessibility information

#### Kids/Family Activities Section
- [ ] Highlight activities for children
- [ ] Consider adding: scavenger hunt, coloring station, Santa photos
- [ ] Create printable activity sheet (PDF)
- [ ] Reference: Saint Alphonsus has North Pole Village, art contests

### Lower Priority (Nice to Have)

#### Live Social Media Feed
- [ ] Embed Instagram feed on homepage
- [ ] Show user-generated content with event hashtag
- [ ] Options: Curator.io, Taggbox, or SnapWidget (free tiers available)
- [ ] Promotes engagement and FOMO

#### Enhanced Sponsor Showcase
- [ ] Make sponsor logos clickable (link to their websites)
- [ ] Add hover animations to sponsor cards
- [ ] Consider video testimonials from sponsors
- [ ] Add "Why Sponsor?" infographic

#### Event Updates/Blog Section
- [ ] Add simple news/updates section
- [ ] Post pre-event announcements
- [ ] Share behind-the-scenes content
- [ ] Post-event recaps with photos
- [ ] Could use simple HTML or integrate with MailerLite landing pages

#### Sticky Mobile Donate Button
- [ ] Add fixed "Donate" button on mobile (bottom of screen)
- [ ] Shows on scroll, disappears at footer
- [ ] Links to Givebutter donation widget
- [ ] Increases mobile conversion rates

---

## Research Sources

- [Mall of America Festival of Trees](https://www.mallofamerica.com/directory/festival-of-trees)
- [Mass Horticultural Society](https://www.masshort.org/festival-of-trees)
- [Saint Alphonsus Festival of Trees](https://www.saintalphonsus.org/foundation/events/festival-of-trees/)
- [Eventbrite: Anatomy of a Successful Festival Website](https://www.eventbrite.com/blog/festival-website-ds00/)
- [Webflow: Event Website Best Practices](https://webflow.com/blog/event-websites)
