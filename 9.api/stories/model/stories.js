const fs = require('fs');

class Story {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.data = JSON.parse(data)
    }

    getStoryList() {
        if (this.data) {
            return this.data;
        }
        else {
            return [];
        }
    }

    getStoryDetail(story_id) {
        return new Promise((resolve, reject) => {
            for (var story of this.data ) {
                if ( story.id == story_id ) {
                    resolve(story);
                    return;
                }
            }
            reject({msg:'Can not find story', code:404});
        });
    }

    upvoteStory(story_id) {
        return new Promise((resolve, reject) => {
            for (var story of this.data ) {
                if ( story.id == story_id ) {
                    story.upvotes++;
                    resolve(story);
                    return;
                }
            }
            reject({msg:'Can not find story', code:404});
        });
    }

    deleteStory(story_id) {
        return new Promise((resolve, reject) => {
            for (var story of this.data ) {
                if ( story.id == story_id ) {
                    this.data.splice(story, 1);
                    resolve(story);
                    return;
                }
            }
            reject({msg:'Can not find story', code:404});
        });
    }
}

module.exports = new Story();