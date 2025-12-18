mod handlers;
use lambda_http::{service_fn, Body, Request, Response};
use lambda_runtime::Error;
use mime_guess::from_path;
use tokio::fs;




async fn serve_static(path: &str) -> Result<Response<Body>, Error> {
    let filepath = if path.starts_with("/static/") {
        format!(".{}", path) // ./static/...
    } else if  path.starts_with("/images/") {
        format!("./public{}", path) // ./public/images/...
    } else {
        return Ok(Response::builder().status(404).body(Body::Text("Not found".into())).unwrap());
    };

    let data = fs::read(&filepath).await?;
    let mime = from_path(&filepath).first_or_octet_stream();
    Ok(Response::builder()
        .header("content-type", mime.as_ref())
        .status(200)
        .body(Body::from(data))
        .unwrap())
}

async fn handler(req: Request) -> Result<Response<Body>, Error> {
  let path = req.uri().path().to_string();

    match path.as_str() {
        "/" => Ok(handlers::index().await),
        "/fragment" => Ok(handlers::fragment().await),
        p if p.starts_with("/static/") || p.starts_with("/images/") => serve_static(&p).await,
        _ => Ok(Response::builder().status(404).body(Body::Text("Not found".into())).unwrap()),
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Use the lambda_http run function which accepts an HTTP service_fn
    // and returns the appropriate Result<(), Error> for this crate.
    lambda_http::run(service_fn(handler)).await
}

