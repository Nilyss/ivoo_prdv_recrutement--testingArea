type postHttpRequestOptions = {
  method: string
  headers: {
    'Content-Type': string
  }
  body: string
}

export default class ApiCalls {
  private apiURLMockup: string
  // private apiURL: string

  private postHttpRequestOptions: (
    data: string | { string }
  ) => postHttpRequestOptions

  private readonly fetch: <T>(
    endpoint: string,
    data: string | { string }
  ) => Promise<T>

  private validStatusCode: number
  private errorMessage: string

  constructor() {
    this.apiURLMockup = '/mockup'
    // this.apiURL = 'http://sms.octopods.fr/models'
    this.validStatusCode = 200
    this.errorMessage =
      'Une erreur est survenue lors de la récupération des données.'

    this.postHttpRequestOptions = (data: string) => {
      return {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    }

    this.fetch = (endpoint: string, data: string | { string }) => {
      return fetch(
        this.apiURLMockup + endpoint,
        this.postHttpRequestOptions(data)
      )
        .then((response: Response) => {
          if (response.status === this.validStatusCode) {
            return response.json()
          } else {
            throw new Error(this.errorMessage)
          }
        })
        .then((res) => res)
        .catch((error) => console.error(error))
    }
  }

  async postRequest<T>(endpoint: string, data: string): Promise<T> {
    return await this.fetch<T>(endpoint, data)
  }

  async putRequest<T>(endpoint: string, data): Promise<T> {
    return await this.fetch<T>(endpoint, data)
  }
}
