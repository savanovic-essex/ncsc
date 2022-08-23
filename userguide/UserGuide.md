# User Guide

# Table of Contents
- [User Guide](#user-guide)
- [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Homepage](#homepage)
    - [Submit a Public Report](#submit-a-public-report)
    - [Cyber Specialist Dashboard](#cyber-specialist-dashboard)
      - [Login](#login)
      - [Reports](#reports)
      - [Authorities](#authorities)
      - [IT Updates](#it-updates)

## Introduction

A link to the deployed web application can be found [here](https://rainbow-pithivier-a3183b.netlify.app/dashboard).


## Homepage

The homepage of the application will look as the screen shot below. The home page contains two links. The first one is for submitting a [public report](#submit-a-public-report), the second link for cyber specialist [login](#login).

<img src="images/homepage.jpg" width = "600">

### Submit a Public Report

This page is reserved for public use. It can be accessed by any individual of the general public who is willing to submit a suspected cybersecurity threat for review by a cyber security specialist. The public report submission page looks like the following:


<img src="images/add_public_report.jpg" width = "600">

### Cyber Specialist Dashboard

#### Login

User accounts for the security specialists are managed by the superadmin through [Firbase Authenticaiton](https://firebase.google.com/docs/auth). Two factor authentication is required by the users to be able to access their accounts, a password that they create after receiving a password reset email, and an OPT that they receive on their mobile devices. The login page looks like the following:

<img src="images/login_page.jpg" width = "300">

After successful login, the cyber specialist will be directed to a dashboard that contains three main divisions. One for private reports, the second one for authorities and the third for IT updates. The dashboard looks like the following:

<img src="images/dashboard.jpg" width = "600">

#### Reports

This division can be used for adding private reports and viewing all the available reports.

Adding a report:

<img src="images/add_private_report.jpg" width = "600">

Viewing list of reports:

<img src="images/list_reports.jpg" width = "600">

In addition, public and private reports can be opened for editing and adding more details.

Editing a private report:

<img src="images/edit_report.jpg" width = "600">


#### Authorities

This division can be used for adding public authorities that can be later informed about cybersecurity threats after adding them to selected reports.

Adding an authority:

<img src="images/add_authority.jpg" width = "600">

Viewing list of authorities:

<img src="images/list_authorities.jpg" width = "600">

Editing an authority:

<img src="images/edit_authority.jpg" width = "300">

#### IT Updates

This division can be used for adding IT Updates that can be later forwarded to public authorities.

Adding an IT Update:

<img src="images/add_it_updates.jpg" width = "600">

Viewing list of IT Updates:

<img src="images/list_it_updates.jpg" width = "600">
