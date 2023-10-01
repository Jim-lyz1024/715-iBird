import React from 'react'
import {
    BIRD_COLLECTION_CHALLANGES_BRONZE,
    BIRD_COLLECTION_CHALLANGES_SILVER,
    BIRD_COLLECTION_CHALLANGES_GOLD,

    CORRECT_QUIZZES_CHALLANGES_BRONZE,
    CORRECT_QUIZZES_CHALLANGES_SILVER,
    BCORRECT_QUIZZES_CHALLANGES_GOLD,

    WALKING_DISTANCE_CHALLANGES_BRONZE,
    WALKING_DISTANCE_CHALLANGES_SILVER,
    WALKING_DISTANCE_CHALLANGES_GOLD,

    ELEVATION_GAIN_CHALLANGES_BRONZE,
    ELEVATION_GAIN_CHALLANGES_SILVER,
    ELEVATION_GAIN_CHALLANGES_GOLD,
} from '../gameConstants'

export default function ChallengeCard({ type, level, achieved }) {
    const badgeUrls = {
        bronze: achieved ? 'https://ibird-images.s3.ap-southeast-2.amazonaws.com/badges/bronze.png' : 'https://ibird-images.s3.ap-southeast-2.amazonaws.com/badges/bronze_black.png',
        silver: achieved ? 'https://ibird-images.s3.ap-southeast-2.amazonaws.com/badges/silver.png' : 'https://ibird-images.s3.ap-southeast-2.amazonaws.com/badges/silver_black.png',
        gold: achieved ? 'https://ibird-images.s3.ap-southeast-2.amazonaws.com/badges/gold.png' : 'https://ibird-images.s3.ap-southeast-2.amazonaws.com/badges/gold_black.png'
    };

    const challenges = {
        birdCollection: {
            bronze: `Collect ${BIRD_COLLECTION_CHALLANGES_BRONZE} birds`,
            silver: `Collect ${BIRD_COLLECTION_CHALLANGES_SILVER} birds`,
            gold: `Collect ${BIRD_COLLECTION_CHALLANGES_GOLD} birds`
        },
        correctQuizzes: {
            bronze: `Answer ${CORRECT_QUIZZES_CHALLANGES_BRONZE} quizzes fully correct`,
            silver: `Answer ${CORRECT_QUIZZES_CHALLANGES_SILVER} quizzes fully correct`,
            gold: `Answer ${BCORRECT_QUIZZES_CHALLANGES_GOLD} quizzes fully correct`
        },
        walkingDistance: {
            bronze: `Walk ${WALKING_DISTANCE_CHALLANGES_BRONZE / 1000} km`,
            silver: `Walk ${WALKING_DISTANCE_CHALLANGES_SILVER / 1000} km`,
            gold: `Walk ${WALKING_DISTANCE_CHALLANGES_GOLD / 1000} km`
        },
        elevationGain: {
            bronze: `Gain ${ELEVATION_GAIN_CHALLANGES_BRONZE} meters in elevation`,
            silver: `Gain ${ELEVATION_GAIN_CHALLANGES_SILVER} meters in elevation`,
            gold: `Gain ${ELEVATION_GAIN_CHALLANGES_GOLD} meters in elevation`
        }
    };

    return (
        <div className='challengeCard' style={{ }}>
            <img src={badgeUrls[level]} alt={`${level} badge`} width={'50px'} height={'50px'} />
            <span>{challenges[type][level]}</span>
        </div>
    );
}
