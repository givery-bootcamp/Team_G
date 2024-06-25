package utils

import (
	// パスを修正しました
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	oauth2 "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

func VerifyGoogleOAuthJwtToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		token := r.Header.Get("Authorization")
		fmt.Println("token: ", token)

		ctx := r.Context()
		oauth2Service, err := oauth2.NewService(ctx, option.WithHTTPClient(&http.Client{}))

		if err != nil {
			httpError(w, http.StatusInternalServerError, err.Error())
			return
		}

		if _, err := oauth2Service.Tokeninfo().AccessToken(token).Context(ctx).Do(); err != nil {
			httpError(w, http.StatusUnauthorized, err.Error())
			return
		}

		// get user info from token
		userinfoCall := oauth2Service.Userinfo.Get().Context(ctx)
		userinfoCall.Header().Set("Authorization", fmt.Sprintf("Bearer %s", token))
		u, err := userinfoCall.Do()
		if err != nil {
			httpError(w, http.StatusInternalServerError, "internal server error")
			return
		}

		// ユーザー情報をリクエストに添付
		r = r.WithContext(context.WithValue(r.Context(), "user", u))

		next.ServeHTTP(w, r)
	})
}

func httpError(w http.ResponseWriter, statusCode int, errMsg string) {
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": errMsg,
	})
}
