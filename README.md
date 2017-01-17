# Linkify
Supposed to be a reddit clone

## Setup
1. `composer install`
1. `npm install`
1. Copy `.env.example` to `.env` and edit it with your environment config.
1. `vendor/bin/phinx init`
1. Edit phinx.yml with your environment settings
1. `vendor/bin/phinx migrate`
1. start web server and point it to project root
1. `npm start`

## Build Production
1. `npm run dist`

## Features
- [x] As a user I should be able to create an account.
- [x] As a user I should be able to login and logout.
- [x] As a user I should be able to edit my account email, password and information.
- [x] As a user I should be able to upload a profile avatar.
- [x] As a user I should be able to create new links with a title and description.
- [x] As a user I should be able to edit my links.
- [x] As a user I should be able to delete my links.
- [x] As a user I should be able to up and down vote links.
- [x] As a user I should be able to comment on a link.

### Extra
- [x] As a user I'm able to edit my comments.
- [x] As a user I'm able to delete my comments.
- [x] As a user I'm able to reply to comments.
- [ ] As a user I'm able to resetting my password with email.

## Requirements
* [Composer](https://getcomposer.org/)
* [Node.js](https://nodejs.org/)
