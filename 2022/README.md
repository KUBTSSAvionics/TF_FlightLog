# TF_FlightLog-2022

## 1stTF
- 2022年6月19日 @笠岡
- 滑走 4本 + ジャンプ 2本
- フライト時のデータはほぼ無し
  - 駐機時の[生データ](220619_1st_TF/in_logger/FLIGHT-raw.CSV)と[前処理後のデータ](220619_1st_TF/in_logger/FLIGHT-preprocessed.CSV)のみ

## 2ndTF
- 2022年7月10日 @笠岡
- 滑走 4本
- サーバーのログとほとんど同期したデータ
  - [1本目](220710_2nd_TF/in_logger/taxi1.csv)
  - [2本目](220710_2nd_TF/in_logger/taxi2.csv)
  - [3本目](220710_2nd_TF/in_logger/taxi3.csv)
  - [4本目](220710_2nd_TF/in_logger/taxi4.csv)
  - 1本目と4本目は回転数が取れていない

## 3rdTF
- 2022年8月8日 @笠岡
- 滑走 2本 + ジャンプ1本
- [滑走1本目](220808_3rd_TF/in_logger/taxi1.csv)
- [滑走2本目](220808_3rd_TF/in_logger/taxi2.csv)
- [ジャンプ1本目](220808_3rd_TF/in_logger/jump1.csv)
- ジャンプ1本目は回転数が取れていない(滑走2本目も途中にとれていない部分がある)

## server_log
データベース内にあるデータを出力したもの

## ログの取得のしかた
### ロガーのログ
1. ロガーのSDカードから`FLIGHT.CSV`を取り出す
2. 基板を起動するたびに見出しが追加されているので，それを区切りにまず分ける
3. 見出しとデータでデータの種類数(あるいは`,`の個数)が一致していないときは合わせる
4. フライト時は電源ONのままにしているとファイルが巨大になるなので，フライトごとにログを分ける(以下は手順の例，他にもやり方はあると思います．GPSで時刻が取れているとさらに楽)
   0. VSCodeに[Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv)をインストール
   1. VSCodeでCSVファイルを開く
   2. VSCodeのウィンドウの左下の"Query"を開く
   3. SQLの構文を使って値の場所を検索できるので，サーバーのログと照らし合わせながら大体の位置を見つける
      1. 例えば，回転数(仮に列番号が`a7`であるとする)が5.3 rpmのところの行だけを取り出したいときは，`SELECT * WHERE a7 == 53`
      2. その行の時刻の列を見れば位置が分かる．
   4. 時刻から逆算すればサーバーのログの記録開始時と終了時がわかる

### サーバーのログ
1. 取得先のAPIキーとURLを書いた`API.txt`を同じディレクトリに置いてから，`main.py`を実行(Python 3.9 で動作確認済み)
2. `flightlog/`内にこれまでのすべてのログが保存されるので使うものだけをコピーする
3. 「[JSONファイルをExcelに変換 - Qiita](https://qiita.com/afukuma/items/65c6e96bd15b319e160f)」を参考にしながら，Excelシートに変換
