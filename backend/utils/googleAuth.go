package utils

import (
	// パスを修正しました

	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"google.golang.org/api/oauth2/v1"
	"google.golang.org/api/option"
)

var userKey ContextKey = "user"

func VerifyGoogleOAuthJwtToken(next http.Handler) http.Handler {

	if os.Getenv("ENV") == "develop" {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// 適当なユーザIDを設定
			mockUser := oauth2.Userinfoplus{
				Id: "507f1f77bcf86cd799439011",
			}

			r = r.WithContext(context.WithValue(r.Context(), userKey, &mockUser))

			next.ServeHTTP(w, r)
		})
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Googleアクセストークンを取得 (not JWT)
		token := r.Header.Get("Authorization")

		ctx := r.Context()
		oauth2Service, err := oauth2.NewService(ctx, option.WithHTTPClient(&http.Client{}))
		if err != nil {
			httpError(w, http.StatusInternalServerError, err.Error())
			return
		}

		// トークンの有効性を確認
		if _, err := oauth2Service.Tokeninfo().AccessToken(token).Context(ctx).Do(); err != nil {
			httpError(w, http.StatusUnauthorized, err.Error())
			return
		}

		// トークンからユーザー情報を取得
		userinfoCall := oauth2Service.Userinfo.Get().Context(ctx)
		userinfoCall.Header().Set("Authorization", fmt.Sprintf("Bearer %s", token))
		u, err := userinfoCall.Do()
		if err != nil {
			httpError(w, http.StatusInternalServerError, "internal server error")
			return
		}

		// ユーザー情報をリクエストに添付
		r = r.WithContext(context.WithValue(r.Context(), userKey, u))

		next.ServeHTTP(w, r)
	})
}

func httpError(w http.ResponseWriter, statusCode int, errMsg string) {
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"error": errMsg,
	})
}
