//
//  ViewController.swift
//  townhall
//
//  Created by Levi Hechenberger on 17.02.2026.
//

import UIKit

class ViewController: UIViewController {
	let source = URL(string: "https://townhall.acryps.com/wallpaper/pilegron/large")!
	var image: UIImageView?

	var pixelAlternate = false

	override func viewDidLoad() {
		super.viewDidLoad()

		updateImage()
	}

	func updateImage() {
		let request = URLRequest(url: source, cachePolicy: .returnCacheDataElseLoad, timeoutInterval: 90)

		URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
			guard error == nil else { self?.scheduleUpdate(); return }
			guard let data else { self?.scheduleUpdate(); return }
			guard let image = UIImage(data: data) else { self?.scheduleUpdate(); return }

			DispatchQueue.main.async {
				guard self != nil else { return }

				self!.pixelAlternate = !self!.pixelAlternate

				let frame = self!.view.frame.insetBy(dx: self!.pixelAlternate ? 1 : -1, dy: 0)
				let imageView = UIImageView(frame: frame)
				imageView.image = image

				self!.view.addSubview(imageView)

				if self!.image != nil {
					self!.image!.removeFromSuperview()
				}

				self!.image = imageView
			}

			self?.scheduleUpdate(timeout: 60 * 5)
		}.resume()
	}

	func scheduleUpdate(timeout: Int = 60) {
		DispatchQueue.main.asyncAfter(deadline: .now() + .seconds(timeout)) {
			self.updateImage()
		}
	}
}

