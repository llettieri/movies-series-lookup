export default interface TMDBRequestTokenDto {
    success: boolean;
    expires_at: Date;
    request_token: string;
}
