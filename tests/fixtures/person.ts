/* eslint-disable camelcase */
import type { PersonDto } from '@/models/dto/person-dto';
import type { CreditsDto } from '@/models/dto/credits-dto';

export const personFixture: PersonDto = {
    biography: 'A test biography.',
    birthday: '1990-01-01',
    character: 'Test Character',
    deathday: '',
    gender: 2,
    homepage: '',
    id: 'person-1',
    known_for_department: 'Acting',
    name: 'Test Person',
    profile_path: '/profile.jpg',
    total_episode_count: 0,
};

export const crewPersonFixture: PersonDto = {
    biography: '',
    birthday: '',
    character: '',
    deathday: '',
    department: 'Directing',
    gender: 1,
    homepage: '',
    id: 'person-2',
    job: 'Director',
    known_for_department: 'Directing',
    name: 'Test Director',
    profile_path: '/director.jpg',
    total_episode_count: 0,
};

export const creditsFixture: CreditsDto = {
    id: 'credits-1',
    cast: [personFixture],
    crew: [crewPersonFixture],
};
